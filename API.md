# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### KubectlFunction <a name="@defiance-digital/kubectl-provider.KubectlFunction"></a>

#### Initializers <a name="@defiance-digital/kubectl-provider.KubectlFunction.Initializer"></a>

```typescript
import { KubectlFunction } from '@defiance-digital/kubectl-provider'

new KubectlFunction(scope: Construct, id: string, props: KubectlFunctionProps)
```

##### `scope`<sup>Required</sup> <a name="@defiance-digital/kubectl-provider.KubectlFunction.parameter.scope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@defiance-digital/kubectl-provider.KubectlFunction.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@defiance-digital/kubectl-provider.KubectlFunction.parameter.props"></a>

- *Type:* [`@defiance-digital/kubectl-provider.KubectlFunctionProps`](#@defiance-digital/kubectl-provider.KubectlFunctionProps)

---



#### Properties <a name="Properties"></a>

##### `handler`<sup>Required</sup> <a name="@defiance-digital/kubectl-provider.KubectlFunction.property.handler"></a>

```typescript
public readonly handler: Function;
```

- *Type:* [`aws-cdk-lib.aws_lambda.Function`](#aws-cdk-lib.aws_lambda.Function)

---


## Structs <a name="Structs"></a>

### KubectlFunctionProps <a name="@defiance-digital/kubectl-provider.KubectlFunctionProps"></a>

The properties for a KubectlFunction construct.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { KubectlFunctionProps } from '@defiance-digital/kubectl-provider'

const kubectlFunctionProps: KubectlFunctionProps = { ... }
```

##### `clusterName`<sup>Required</sup> <a name="@defiance-digital/kubectl-provider.KubectlFunctionProps.property.clusterName"></a>

```typescript
public readonly clusterName: string;
```

- *Type:* `string`

The name of the cluster to access.

---

##### `roleArn`<sup>Required</sup> <a name="@defiance-digital/kubectl-provider.KubectlFunctionProps.property.roleArn"></a>

```typescript
public readonly roleArn: string;
```

- *Type:* `string`

The Role ARN that is to be assumed during the EKS authentication process to access and run commands on the cluster.

---

##### `vpc`<sup>Required</sup> <a name="@defiance-digital/kubectl-provider.KubectlFunctionProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* [`aws-cdk-lib.aws_ec2.IVpc`](#aws-cdk-lib.aws_ec2.IVpc)

The VPC where the Kubernetes cluster is.

---

##### `additionalParams`<sup>Optional</sup> <a name="@defiance-digital/kubectl-provider.KubectlFunctionProps.property.additionalParams"></a>

```typescript
public readonly additionalParams: FunctionOptions;
```

- *Type:* [`aws-cdk-lib.aws_lambda.FunctionOptions`](#aws-cdk-lib.aws_lambda.FunctionOptions)

Additional parameters to pass to the Lambda function.

---



