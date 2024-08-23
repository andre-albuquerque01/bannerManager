interface InputProps {
  type: string
  label: string
  id: string
  name: string
  required: boolean
  value?: string
  placeholder?: string
}

export const InputComponent = ({ ...props }: InputProps) => {
  return (
    <div className="flex flex-col text-black">
      <label htmlFor={props.id}>
        {props.label}
        {props.required && <span className="text-xs text-red-600"> *</span>}
      </label>
      <input
        type={props.type}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        className="bg-transparent border border-zinc-400 p-1.5 outline-none text-black rounded-lg w-96 max-sm:w-80"
        required={props.required}
      />
    </div>
  )
}
