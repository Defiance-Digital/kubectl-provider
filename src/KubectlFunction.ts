import * as path from 'path';

import { KubectlV25Layer } from '@aws-cdk/lambda-layer-kubectl-v25';
import { CfnOutput, Duration } from 'aws-cdk-lib';
import { IVpc, SubnetType } from 'aws-cdk-lib/aws-ec2';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Code, Function, FunctionOptions, Runtime } from 'aws-cdk-lib/aws-lambda';
import { AwsCliLayer } from 'aws-cdk-lib/lambda-layer-awscli';
import { KubectlLayer } from 'aws-cdk-lib/lambda-layer-kubectl';

import { Construct } from 'constructs';

/**
 * The properties for a KubectlFunction construct
 */
export interface KubectlFunctionProps {
  /**
   * Whether to use kubectl v1.25 or not for the lambda layer. Set this to true if your EKS cluster is 1.25+
   *
   * @default false
   */
  readonly usev125?: boolean;
  /**
   * The Role ARN that is to be assumed during the EKS authentication process to access and run commands on the cluster.
   */
  readonly roleArn: string;

  /**
   * The name of the cluster to access.
   */
  readonly clusterName: string;

  /**
   * The VPC where the Kubernetes cluster is
   */
  readonly vpc: IVpc;

  /**
   * Additional parameters to pass to the Lambda function.
   */
  readonly additionalParams?: FunctionOptions;
}

export class KubectlFunction extends Construct {
  public handler: Function;

  constructor(scope: Construct, id: string, props: KubectlFunctionProps) {

    super(scope, id);
    this.handler = new Function(this, 'KubectlProvider', {
      code: Code.fromAsset(path.join(__dirname, 'handlers')),
      handler: 'index.handler',
      runtime: Runtime.PYTHON_3_10,
      environment: {
        CLUSTER_NAME: props.clusterName,
        ROLE_ARN: props.roleArn,
      },
      timeout: Duration.seconds(45),
      vpc: props.vpc,
      vpcSubnets: {
        subnetType: SubnetType.PRIVATE_WITH_EGRESS,
      },
      ...props.additionalParams,
    });
    this.handler.addToRolePolicy(new PolicyStatement({
      actions: ['eks:DescribeCluster'],
      resources: ['*'],
      effect: Effect.ALLOW,
    }));

    this.handler.addToRolePolicy(new PolicyStatement({
      actions: ['sts:AssumeRole'],
      resources: [props.roleArn],
      effect: Effect.ALLOW,
    }));

    this.handler.addLayers(new AwsCliLayer(this, 'AwsCliLayer'));
    if (props.usev125) {
      this.handler.addLayers(new KubectlV25Layer(this, 'KubectlLayer'));

    } else {
      this.handler.addLayers(new KubectlLayer(this, 'KubectlLayer'));
    }


    new CfnOutput(this, 'SecurityGroupForLambda', {
      value: this.handler.connections.securityGroups[0].securityGroupId,
    });
  }
}
