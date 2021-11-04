import { Vpc } from '@aws-cdk/aws-ec2';
import { App, Stack } from '@aws-cdk/core';
import { KubectlFunction } from '../src';

const app = new App();
const stack = new Stack(app, 'TestingFunctionStack', { env: { account: '227350585542', region: 'us-east-1' } });
const vpc = Vpc.fromLookup(stack, 'Vpc', { vpcId: 'vpc-026048a4fc64bf21b' });
new KubectlFunction(stack, 'TestFunction', {
  vpc,
  roleArn: 'arn:aws:iam::227350585542:role/Dev-Cluster-ClusterCreationRole360249B6-1GR9RPOPQW2E1',
  clusterName: 'dev',
});