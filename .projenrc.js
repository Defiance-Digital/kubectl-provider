const { awscdk, javascript } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Matthew Bonig',
  authorAddress: 'matthew.bonig@defiance.ai',
  cdkVersion: '2.75.0',
  defaultReleaseBranch: 'main',
  depsUpgrade: false,
  homepage: 'https://defiance.ai',
  name: '@defiance-digital/kubectl-provider',
  repositoryUrl: 'https://github.com/Defiance-Digital/kubectl-provider.git',
  description: 'A Lambda function kubectl commands against an EKS repository',
  devDeps: ['eslint'],
  deps: ['@aws-cdk/lambda-layer-kubectl-v25'],
  peerDeps: ['@aws-cdk/lambda-layer-kubectl-v25'],
  gitignore: ['cdk.out/', 'cdk.context.json', '.idea/'],
  keywords: ['cdk', 'eks', 'kubectl'],
  integrationTestAutoDiscover: false,
  releaseToNpm: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
  jsiiVersion: '^5.0.7',
});
project.compileTask.exec('rm -rf lib/handlers/; mkdir lib/handlers/', { name: 'mkdir python handler' });
project.compileTask.exec('cp src/handlers/*.py lib/handlers/', { name: 'copy python handler' });


project.synth();
