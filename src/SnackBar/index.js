import React from 'react';
import './index.css';

function SnackBar(props) {
	const { value } = props;

	return (<div className="snackbar"> {value} </div>);
}

export default SnackBar;