import { useForm } from 'react-hook-form'

export default function BasicForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        // Process form data here (e.g., API call)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <p className="error">{errors.name.message}</p>}
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    {...register('email', {
                        required: 'Email is required',
                        // pattern: {
                        //     value: /^[^]+@[^.]+\\..+$/,
                        //     message: 'Invalid email address',
                        // },
                    })}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            <button type="submit">Submit</button>
        </form>
    )
}