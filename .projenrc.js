const { AwsCdkConstructLibrary } = require('projen');
const { Task } = require('projen/lib/tasks');
const project = new AwsCdkConstructLibrary({
  author: 'Matthew Bonig',
  authorAddress: 'matthew.bonig@gmail.com',
  cdkVersion: '1.100.0',
  defaultReleaseBranch: 'main',
  name: '@Defiance-Digital/kubectl-provider',
  repositoryUrl: 'https://github.com/Defiance-Digital/kubectl-provider.git',
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
  npmRegistryUrl: 'https://npm.pkg.github.com',
});
project.compileTask.exec('mkdir lib/handlers/', { name: 'mkdir python handler' });
project.compileTask.exec('cp src/handlers/*.py lib/handlers/', { name: 'copy python handler' });

project.setScript('test:integ', 'npx cdk synth --app "ts-node -P tsconfig.dev.json test/test.integ.ts"');

project.synth();