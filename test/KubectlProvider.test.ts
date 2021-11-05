import { Template } from '@aws-cdk/assertions';
import { Vpc } from '@aws-cdk/aws-ec2';
import { Code, CodeConfig } from '@aws-cdk/aws-lambda';
import { App, DockerImage, Duration, Stack } from '@aws-cdk/core';
import { KubectlFunction } from '../src';

let fromAssetMock: any;
let fromBuildMock: any;

describe('LambdaFunction', () => {
  beforeAll(() => {
    // mock the Code calls so tests run quicker
    fromAssetMock = jest.spyOn(Code, 'fromAsset').mockReturnValue({
      isInline: false,
      bind: (): CodeConfig => {
        return {
          s3Location: {
            bucketName: 'my-bucket',
            objectKey: 'my-key',
          },
        };
      },
      bindToResource: () => {
        return;
      },
    } as any);
    fromBuildMock = jest.spyOn(DockerImage, 'fromBuild').mockReturnValue({
      isInline: false,
      bind: (): CodeConfig => {
        return {
          s3Location: {
            bucketName: 'my-bucket',
            objectKey: 'my-key',
          },
        };
      },
      bindToResource: () => {
        return;
      },
    } as any);
  });
  afterAll(() => {
    // restore the Code from mock
    fromAssetMock?.mockRestore();
    fromBuildMock?.mockRestore();
  });
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

  test('Additional Params Lambda Snapshot', () => {
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
      additionalParams: { timeout: Duration.seconds(30), memorySize: 512 },
    });
    const assert = Template.fromStack(stack);

    const resource = assert.findResources('AWS::Lambda::Function');
    expect(resource).toMatchSnapshot();
  });
});
