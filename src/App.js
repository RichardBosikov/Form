import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './App.module.css';

const fieldsScheme = yup.object().shape({
	email: yup
		.string()
		.matches(
			/^[A-Z0-9._-]+@[A-Z]+.+[A-Z]$/i,
			'В email используются запрещенные символы.',
		)
		.max(25, 'Должно быть меньше 25 символов')
		.min(5, 'Должно быть больше 5 символов'),
	password: yup
		.string()
		.matches(
			/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
			'Пароль не соответствует требования.',
		)
		.max(20, 'Пароль должен быть меньше 20 символов')
		.min(8, 'Пароль должен быть больше 8 символов'),
	tryPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			tryPassword: '',
		},

		resolver: yupResolver(fieldsScheme),
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const tryPasswordError = errors.tryPassword?.message;

	const onSubmit = (formData) => {
		console.log(formData);
	};

	return (
		<div className={styles.app}>
			<h1 className={styles.hone}>Форма регистрации</h1>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.autor}>
				{emailError && <div className={styles.errorLabel}>{emailError}</div>}
				{passwordError && (
					<div className={styles.errorLabel}>{passwordError}</div>
				)}
				{tryPasswordError && (
					<div className={styles.errorLabel}>{tryPasswordError}</div>
				)}
				<label className={styles.label}>Введите Email:</label>
				<input
					name="email"
					type="text"
					{...register('email')}
					className={styles.inputGroup}
				/>
				<label className={styles.label}>Введите пароль:</label>
				<input
					name="password"
					type="password"
					{...register('password')}
					className={styles.inputGroup}
				/>
				<label className={styles.label}>Повторите пароль:</label>
				<input
					name="password"
					type="password"
					{...register('tryPassword')}
					className={styles.inputGroup}
				/>
				<button type="submit" disabled={!!emailError} className={styles.button}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
