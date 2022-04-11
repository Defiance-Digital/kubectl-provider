const { awscdk, javascript } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Matthew Bonig',
  authorAddress: 'matthew.bonig@defiance.ai',
  cdkVersion: '2.4.0',
  defaultReleaseBranch: 'main',
  name: '@defiance-digital/kubectl-provider',
  repositoryUrl: 'https://github.com/Defiance-Digital/kubectl-provider.git',
  description: 'A Lambda function kubectl commands against an EKS repository',
  devDeps: ['eslint'],
  gitignore: ['cdk.out/', 'cdk.context.json', '.idea/'],
  keywords: ['cdk', 'eks', 'kubectl'],
  integrationTestAutoDiscover: false,
  releaseToNpm: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
});
project.compileTask.exec('rm -rf lib/handlers/; mkdir lib/handlers/', { name: 'mkdir python handler' });
project.compileTask.exec('cp src/handlers/*.py lib/handlers/', { name: 'copy python handler' });


project.synth();