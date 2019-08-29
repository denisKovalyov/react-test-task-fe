import React from 'react';
import './index.css';

function Input(props) {
	const { label, value, onChange, ...restProps } = props;

	return (
		<div className="form-control-wrapper">
			<label htmlFor="threshold">{label}</label>
			<input 
				className="form-control"
				value={value}
				onChange={onChange}
				{...restProps}
			/>
		</div>
	);
}

export default Input;
