# useInputs

## A useful react hook for managing inputs

-   Great **flexibility** and super **easyToUse** :)))

-   Written in **TypeScript** for better ide suggestion

# Installation

```bash
yarn add use-inputs
```

Or if you prefer npm :

```bash
npm i use-inputs
```

# Usage

```js
import React from 'react';
import useInputs from 'use-inputs';

const App = () => {
	const { register, Inputs } = useInputs();
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
import useInputs from 'use-inputs';

const App = () => {
	const { register } = useInputs({
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
import useInputs from 'use-inputs';

const App = () => {
	const { register } = useInputs({ isRsuite: true });
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

## can be destructed ( const { **...** } = useInputs() ) from useInputs

<br>

```js
register(name:string); //Register a new input to the hook
```

```js
Inputs, setInputs(); //Handling inputs states
```

```ts
isDirty(name:string); //Return true if user modified the input
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
isInputsValid; //If all inputs are valid it's true
```

```ts
resetInputs(); // Reset all inputs
```

```ts
getInputsData();
// Get an object only including name and value of the inputs

{
	//Example for code in usage section:
	name:'my name',
	email:'myEmail@test.com',
	password:'mySecretPass'
}
```

```ts
addExtra(name:string,extra:object); // Add extra data to the input
```

⚠ **Attention**: If the **extra** object have property with below **keys** , it will overwrite the input state ,<br>
so **avoid** using these **keys** to extra object :

> **value** , **dirty** , **validation**

<hr>

## Tips

-   If you want to have callback on **Inputs** changes you can use **useEffect** hook
    ```js
    useEffect(() => console.log(Inputs), [Inputs]);
    ```
