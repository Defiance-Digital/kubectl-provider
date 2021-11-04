const { AwsCdkConstructLibrary } = require('projen');
const { Task } = require('projen/lib/tasks');
const project = new AwsCdkConstructLibrary({
  author: 'Matthew Bonig',
  authorAddress: 'matthew.bonig@gmail.com',
  cdkVersion: '1.100.0',
  defaultReleaseBranch: 'main',
  name: 'kubectl-provider',
  repositoryUrl: 'https://github.com/defianceai/kubectl-provider.git',
  description: 'A Lambda function setup to make generic kubectl commands against an EKS repository',
  cdkDependencies: [
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-lambda-python',
    '@aws-cdk/core',
    '@aws-cdk/lambda-layer-awscli',
    '@aws-cdk/lambda-layer-kubectl',
  ],
  cdkDependenciesAsDeps: false,
  cdkTestDependencies: ['@aws-cdk/assertions'],
  devDeps: ['eslint'],
  gitignore: ['cdk.out/', 'cdk.context.json'],
});

project.setScript('test:integ', 'npx cdk synth --app "ts-node -P tsconfig.dev.json test/test.integ.ts"');
project.synth();