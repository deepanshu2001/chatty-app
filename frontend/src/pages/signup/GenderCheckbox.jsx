import React, { useState } from 'react'

const GenderCheckbox = ({checkedgender,handleOnchangeGender}) => {
	
    return (
         		<div className='flex'>
         			<div className='form-control'>
         				<label className={`label gap-2 cursor-pointer ${checkedgender==="male"?"selected":""}`}>
         					<span className='label-text'>Male</span>
         					<input checked={checkedgender==="male"} onChange={()=>handleOnchangeGender("male")} type='checkbox' className='checkbox border-slate-900' />
         				</label>
         			</div>
         			<div className='form-control'>
         				<label className={`label gap-2 cursor-pointer ${checkedgender==="female"?"selected":""}`}>
         					<span className='label-text'>Female</span>
         					<input checked={checkedgender==="female"} onChange={()=>handleOnchangeGender("female")} type='checkbox' className='checkbox border-slate-900' />
         				</label>
         			</div>
         		</div>
         	);
}

export default GenderCheckbox