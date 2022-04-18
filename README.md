# Kubectl Provider

This CDK construct creates a Lambda function capable of making arbitrary kubectl calls against a cluster.

## Example

```ts
const app = new App();
const stack = new Stack(app, 'TestingFunctionStack', { env: { account: '...', region: '...' } });
const vpc = Vpc.fromLookup(stack, 'Vpc', { vpcId: '...' });
new KubectlFunction(stack, 'TestFunction', {
  vpc,
  roleArn: 'arn:aws:iam::0123456789012:role/ProxyKubectlRole360249B6-1GR9RPOPQW2E1',
  clusterName: 'dev',
});
```

## Executing

To execute the Lambda function, hand it a basic commands field:

```json
{
  "commands": ["get", "nodes", "-o", "json"]
}
```
