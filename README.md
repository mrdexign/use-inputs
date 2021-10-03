# useForm

## A useful react hook for managing forms & inputs

-   Great **flexibility** and super **easyToUse** :)))

-   Written in **TypeScript** for better ide suggestion

# Installation

```bash
yarn add use-form-logic
```

Or if you prefer npm :

```bash
npm i use-form-logic
```

# Usage

```js
import React from 'react';
import useForm from 'use-form-logic';

const App = () => {
	const { register, Inputs } = useForm();
	return (
		<form>
			<input {...register('name')} />

			<input {...register('email')} />

			<input {...register('password')} type='password' />

			<button onClick={() => console.log(Inputs)}>Log Inputs</button>
		</form>
	);
};

export default App;
```

# Validation

Adding validation to inputs :

> You can use **regex** or **validator** function (or even both at the same time) for validation

> If you set **require : true** , the input value can not be empty

```js
import React from 'react';
import useForm from 'use-form-logic';

const App = () => {
	const { register } = useForm({
		validation: {
			email: {
				regex: /^[\w._%+-]+@[\w-]+\.+.[A-Za-z]{2,}$/,
				errorMsg: 'email is invalid',
			},
			password: {
				required: true,
				validator: value => value.length > 5,
				errorMsg: 'password length most be greater than 5',
			},
		},
	});

	return (
		<form>
			<input {...register('email')} />
			<input {...register('password')} />
			<button>Login</button>
		</form>
	);
};

export default App;
```

# RSuite Supported !

### https://rsuitejs.com/components/input/<br>

### You can use this hook for custom rsuite **<Input\>** component like this :

```js
import { Input } from 'rsuite';
import useForm from 'use-form-logic';

const App = () => {
	const { register } = useForm({ isRsuite: true });
	return (
		<form>
			<Input {...register('email')} />
			<Input {...register('password')} />
			// or you can have both at same time !
			<input {...register('normalInput', undefined, false)} />
		</form>
	);
};

export default App;
```

# Features & Methods

## below useful methods and objects ,

## can be destructed ( const { **...** } = useForm() ) from useForm

<br>

```js
register(); //register a new input to the hook
```

```js
Inputs, setInputs(); //handling inputs states
```

```ts
isDirty(name:string); //return true if user modified the input
```

```ts
//Validation info about the input
const validation = validOf(name:string);

validation.msg
//Error message if the input is invalid

validation.isValid
//Validity of the input

validation.isValidDirty
//If the input is not modified : true
//If the input is modified & valid : true
//Otherwise : false

```

```ts
isFormValid; //If all inputs are valid it's true
```

```ts
resetFormValues(); // reset all inputs
```

```ts
getFormData();
// get an object only including name and value of the inputs

{
	//Example for code in usage section:
	name:'my name',
	email:'myEmail@test.com',
	password:'mySecretPass'
}
```

```ts
addExtra(name:string,extra:object); // add extra data to the input
```

⚠ **Attention**: If the **extra** object have property with below **keys** , it will overwrite the input state ,<br>
so avoid using these key to extra object :

> **value** , **dirty** , **validation**

<hr>

## Tips

-   If you want to have callback on **Inputs** changes you can use **useEffect** hook
    ```js
    useEffect(() => console.log(Inputs), [Inputs]);
    ```
