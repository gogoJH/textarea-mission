import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';

export default props => {
	
	const [fetching, setFetching] = useState(false);
	
	const logoutClick = () => setFetching(true)
	
	const logoutRequest = async (fetchingStatus) => {
	  console.log('fethcing?')
		try {
			if (fetchingStatus) {
				const res = await fetch('/api/session', {method: 'DELETE'});
        console.log(await res)
				setFetching(false)
				props.logout(null)
				console.log('logout!')
			} else {
				throw new Error('Logout is proceeding')
			}	
		} catch (e) {
			console.log(e.message)
		}
		
	}
	
	useEffect(()=>{
		logoutRequest(fetching)
	},[fetching])
	
	return <Button
		onClick={logoutClick}
	>
		{props.children}
	</Button>
}