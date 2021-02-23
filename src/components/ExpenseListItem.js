import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ description, amount, createdAt, id}) => (
  <div>
    <li>
      <Link to={`/edit/${id}`}><h3>{description}</h3></Link>
      <p>Amount: {amount/100}</p>
      <p>Created At: {createdAt}</p>
    </li>
  </div>
)


export default ExpenseListItem