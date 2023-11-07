const Button = (props) => {
  const classNames = {
    primary: 'bg-blue-500 hover:bg-blue-700 rounded',
    secondary: 'bg-gray-500 hover:bg-gray-700 rounded',
    success: 'bg-green-500 hover:bg-green-700 rounded',
    danger: 'bg-[#B40500] hover:bg-red-700 rounded',
    warning: 'bg-yellow-500 hover:bg-yellow-700 rounded',
    info: 'bg-blue-500 hover:bg-blue-700 rounded',
    light: 'bg-gray-100 hover:bg-gray-200 rounded',
    dark: 'bg-gray-700 hover:bg-gray-800 rounded',
    link: 'bg-transparent hover:text-neutral-300 rounded',
  };

  return (
    <button
      type='button'
      className={`${classNames[props.variant]}${
        props.className ? ` ${props.className}` : ''
      } flex items-center`}
      onClick={props.onClick}
    >
      <div className='icon'>{props.icon}</div>
      {props.children}
    </button>
  );
};

export default Button;
