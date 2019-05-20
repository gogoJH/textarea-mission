import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';

export default function TreeUnit ({path,setText,getSubTree}) {
	const [extend, setExtend] = useState(false);
	const [subTree, setSubTree] = useState([]);
	
	const extendFn = (e) => {
		e.stopPropagation()
		setExtend(!extend);
	}
	
	const makeSubTree = subTreeItem => <TreeUnit
		path={[path,subTreeItem].join('/')}
		setText={setText}
		getSubTree={getSubTree}
	/>
	
	const selectFile = () => setText()
	
	useEffect(()=>{
		if (extend) {
			getSubTree(path)
			.then(res=>{
				const {fileList, fileContent} = res
				setSubTree(fileList)
				setText(fileContent)
			})
		}
	},[extend])
	
	return <li onClick={extendFn}>
		<span>{subTree &&	<>{extend ? 'ㅜ' : 'ㅏ'}</>}</span>{path === '' ? '/' : path}
		{extend && <ul>
			{subTree && subTree.map(makeSubTree)}
		</ul>}
	</li>
}