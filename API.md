# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### KubectlFunction <a name="@Defiance-Digital/kubectl-provider.KubectlFunction"></a>

#### Initializers <a name="@Defiance-Digital/kubectl-provider.KubectlFunction.Initializer"></a>

```typescript
import { KubectlFunction } from '@Defiance-Digital/kubectl-provider'

new KubectlFunction(scope: Construct, id: string, props: KubectlFunctionProps)
```

##### `scope`<sup>Required</sup> <a name="@Defiance-Digital/kubectl-provider.KubectlFunction.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@Defiance-Digital/kubectl-provider.KubectlFunction.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@Defiance-Digital/kubectl-provider.KubectlFunction.parameter.props"></a>

- *Type:* [`@Defiance-Digital/kubectl-provider.KubectlFunctionProps`](#@Defiance-Digital/kubectl-provider.KubectlFunctionProps)

---



#### Properties <a name="Properties"></a>

##### `handler`<sup>Required</sup> <a name="@Defiance-Digital/kubectl-provider.KubectlFunction.property.handler"></a>

```typescript
public readonly handler: Function;
```

- *Type:* [`@aws-cdk/aws-lambda.Function`](#@aws-cdk/aws-lambda.Function)

---


## Structs <a name="Structs"></a>

### KubectlFunctionProps <a name="@Defiance-Digital/kubectl-provider.KubectlFunctionProps"></a>

The properties for a KubectlFunction construct.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { KubectlFunctionProps } from '@Defiance-Digital/kubectl-provider'

const kubectlFunctionProps: KubectlFunctionProps = { ... }
```

##### `clusterName`<sup>Required</sup> <a name="@Defiance-Digital/kubectl-provider.KubectlFunctionProps.property.clusterName"></a>

```typescript
public readonly clusterName: string;
```

- *Type:* `string`

The name of the cluster to access.

---

##### `roleArn`<sup>Required</sup> <a name="@Defiance-Digital/kubectl-provider.KubectlFunctionProps.property.roleArn"></a>

```typescript
public readonly roleArn: string;
```

- *Type:* `string`

The Role ARN that is to be assumed during the EKS authentication process to access and run commands on the cluster.

---

##### `vpc`<sup>Required</sup> <a name="@Defiance-Digital/kubectl-provider.KubectlFunctionProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* [`@aws-cdk/aws-ec2.IVpc`](#@aws-cdk/aws-ec2.IVpc)

The VPC where the Kubernetes cluster is.

---



