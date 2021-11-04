import { Template } from '@aws-cdk/assertions';
import { Vpc } from '@aws-cdk/aws-ec2';
import { App, Stack } from '@aws-cdk/core';
import { KubectlFunction } from '../src';

test('Basic Lambda Snapshot', () => {
  const app = new App();
  const stack = new Stack(app, 'test');

  const testVpc = Vpc.fromVpcAttributes(stack, 'TestVpc', {
    privateSubnetIds: ['s-123'],
    vpcId: 'vpc-123123',
    availabilityZones: ['us-east-1a'],
  });
  new KubectlFunction(stack, 'TestFunction', {
    roleArn: 'somerolearn',
    clusterName: 'somecluster',
    vpc: testVpc,
  });
  const assert = Template.fromStack(stack);

  const resource = assert.findResources('AWS::Lambda::Function');
  expect(resource).toMatchSnapshot();
});