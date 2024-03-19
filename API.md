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


# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### KubectlFunction <a name="KubectlFunction" id="@defiance-digital/kubectl-provider.KubectlFunction"></a>

#### Initializers <a name="Initializers" id="@defiance-digital/kubectl-provider.KubectlFunction.Initializer"></a>

```typescript
import { KubectlFunction } from '@defiance-digital/kubectl-provider'

new KubectlFunction(scope: Construct, id: string, props: KubectlFunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@defiance-digital/kubectl-provider.KubectlFunction.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@defiance-digital/kubectl-provider.KubectlFunction.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@defiance-digital/kubectl-provider.KubectlFunction.Initializer.parameter.props">props</a></code> | <code><a href="#@defiance-digital/kubectl-provider.KubectlFunctionProps">KubectlFunctionProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@defiance-digital/kubectl-provider.KubectlFunction.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@defiance-digital/kubectl-provider.KubectlFunction.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@defiance-digital/kubectl-provider.KubectlFunction.Initializer.parameter.props"></a>

- *Type:* <a href="#@defiance-digital/kubectl-provider.KubectlFunctionProps">KubectlFunctionProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@defiance-digital/kubectl-provider.KubectlFunction.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@defiance-digital/kubectl-provider.KubectlFunction.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@defiance-digital/kubectl-provider.KubectlFunction.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@defiance-digital/kubectl-provider.KubectlFunction.isConstruct"></a>

```typescript
import { KubectlFunction } from '@defiance-digital/kubectl-provider'

KubectlFunction.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@defiance-digital/kubectl-provider.KubectlFunction.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@defiance-digital/kubectl-provider.KubectlFunction.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@defiance-digital/kubectl-provider.KubectlFunction.property.handler">handler</a></code> | <code>aws-cdk-lib.aws_lambda.Function</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@defiance-digital/kubectl-provider.KubectlFunction.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `handler`<sup>Required</sup> <a name="handler" id="@defiance-digital/kubectl-provider.KubectlFunction.property.handler"></a>

```typescript
public readonly handler: Function;
```

- *Type:* aws-cdk-lib.aws_lambda.Function

---


## Structs <a name="Structs" id="Structs"></a>

### KubectlFunctionProps <a name="KubectlFunctionProps" id="@defiance-digital/kubectl-provider.KubectlFunctionProps"></a>

The properties for a KubectlFunction construct.

#### Initializer <a name="Initializer" id="@defiance-digital/kubectl-provider.KubectlFunctionProps.Initializer"></a>

```typescript
import { KubectlFunctionProps } from '@defiance-digital/kubectl-provider'

const kubectlFunctionProps: KubectlFunctionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@defiance-digital/kubectl-provider.KubectlFunctionProps.property.clusterName">clusterName</a></code> | <code>string</code> | The name of the cluster to access. |
| <code><a href="#@defiance-digital/kubectl-provider.KubectlFunctionProps.property.roleArn">roleArn</a></code> | <code>string</code> | The Role ARN that is to be assumed during the EKS authentication process to access and run commands on the cluster. |
| <code><a href="#@defiance-digital/kubectl-provider.KubectlFunctionProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The VPC where the Kubernetes cluster is. |
| <code><a href="#@defiance-digital/kubectl-provider.KubectlFunctionProps.property.additionalParams">additionalParams</a></code> | <code>aws-cdk-lib.aws_lambda.FunctionOptions</code> | Additional parameters to pass to the Lambda function. |
| <code><a href="#@defiance-digital/kubectl-provider.KubectlFunctionProps.property.usev125">usev125</a></code> | <code>boolean</code> | Whether to use kubectl v1.25 or not for the lambda layer. Set this to true if your EKS cluster is 1.25+. |
| <code><a href="#@defiance-digital/kubectl-provider.KubectlFunctionProps.property.usev128">usev128</a></code> | <code>boolean</code> | Whether to use kubectl v1.28 or not for the lambda layer. Set this to true if your EKS cluster is 1.25+. |

---

##### `clusterName`<sup>Required</sup> <a name="clusterName" id="@defiance-digital/kubectl-provider.KubectlFunctionProps.property.clusterName"></a>

```typescript
public readonly clusterName: string;
```

- *Type:* string

The name of the cluster to access.

---

##### `roleArn`<sup>Required</sup> <a name="roleArn" id="@defiance-digital/kubectl-provider.KubectlFunctionProps.property.roleArn"></a>

```typescript
public readonly roleArn: string;
```

- *Type:* string

The Role ARN that is to be assumed during the EKS authentication process to access and run commands on the cluster.

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@defiance-digital/kubectl-provider.KubectlFunctionProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

The VPC where the Kubernetes cluster is.

---

##### `additionalParams`<sup>Optional</sup> <a name="additionalParams" id="@defiance-digital/kubectl-provider.KubectlFunctionProps.property.additionalParams"></a>

```typescript
public readonly additionalParams: FunctionOptions;
```

- *Type:* aws-cdk-lib.aws_lambda.FunctionOptions

Additional parameters to pass to the Lambda function.

---

##### `usev125`<sup>Optional</sup> <a name="usev125" id="@defiance-digital/kubectl-provider.KubectlFunctionProps.property.usev125"></a>

```typescript
public readonly usev125: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to use kubectl v1.25 or not for the lambda layer. Set this to true if your EKS cluster is 1.25+.

---

##### `usev128`<sup>Optional</sup> <a name="usev128" id="@defiance-digital/kubectl-provider.KubectlFunctionProps.property.usev128"></a>

```typescript
public readonly usev128: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to use kubectl v1.28 or not for the lambda layer. Set this to true if your EKS cluster is 1.25+.

---



