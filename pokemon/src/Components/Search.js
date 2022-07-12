import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Search = () => {

const [myOptions, setMyOptions] = useState([])


const getDataFromAPI = () => {
	console.log("Options Fetched from API")

	fetch('https://pokeapi.co/api/v2/pokemon/ditto').then((response) => {
	return response.json()
	}).then((res) => {
	console.log(res.data)
	for (var i = 0; i < res.data.length; i++) {
		myOptions.push(res.data[i].pokemon_name)
	}
	setMyOptions(myOptions)
	})
}

return (
	<div style={{ marginLeft: '40%', marginTop: '60px' }}>
	<Autocomplete
		style={{ width: 500 }}
		freeSolo
		autoComplete
		autoHighlight
		options={myOptions}
		renderInput={(params) => (
		<TextField {...params}
			onChange={getDataFromAPI}
			variant="outlined"
			label="Search Box"
		/>
		)}
	/>
	</div>
);
}

export default Search;