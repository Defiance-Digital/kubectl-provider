import * as path from 'path';
import { IVpc, SubnetType } from '@aws-cdk/aws-ec2';
import { Effect, PolicyStatement } from '@aws-cdk/aws-iam';
import { Runtime } from '@aws-cdk/aws-lambda';
import { PythonFunction } from '@aws-cdk/aws-lambda-python';
import { CfnOutput, Construct, Duration } from '@aws-cdk/core';
import { AwsCliLayer } from '@aws-cdk/lambda-layer-awscli';
import { KubectlLayer } from '@aws-cdk/lambda-layer-kubectl';

/**
 * The properties for a KubectlFunction construct
 */
export interface KubectlFunctionProps {
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
}

export class KubectlFunction extends Construct {
  public handler: PythonFunction;

  constructor(scope: Construct, id: string, props: KubectlFunctionProps) {

    super(scope, id);
    this.handler = new PythonFunction(this, 'KubectlProvider', {
      entry: path.join(__dirname, 'handlers'),
      index: 'index.py',
      runtime: Runtime.PYTHON_2_7,
      environment: {
        CLUSTER_NAME: props.clusterName,
        ROLE_ARN: props.roleArn,
      },
      timeout: Duration.seconds(45),
      vpc: props.vpc,
      vpcSubnets: {
        subnetType: SubnetType.PRIVATE_WITH_NAT,
      },
    });
    this.handler.addToRolePolicy(new PolicyStatement({
      actions: ['eks:DescribeCluster'],
      resources: ['*'],
      effect: Effect.ALLOW,
    }));

    this.handler.addToRolePolicy(new PolicyStatement({
      actions: ['sts:AssumeRole'],
      resources: ['arn:aws:iam::227350585542:role/Dev-Cluster-ClusterCreationRole360249B6-1GR9RPOPQW2E1'],
      effect: Effect.ALLOW,
    }));

    this.handler.addLayers(new AwsCliLayer(this, 'AwsCliLayer'));
    this.handler.addLayers(new KubectlLayer(this, 'KubectlLayer'));

    new CfnOutput(this, 'SecurityGroupForLambda', {
      value: this.handler.connections.securityGroups[0].securityGroupId,
    });
  }
}