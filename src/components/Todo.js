import React from 'react';
import Button from '@mui/material/Button';
import styled, { css } from "styled-components";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./todo.css";

const ButtonStyled = styled(Button)`
    margin-top: 10px;
    align-items: left;

    &,
    &:hover {
        // Truyền vào property cho Button
        ${(p) => p.isCompleted && css`
            text-decoration: line-through;
        `}
    }
    

    
`;

function Todo({ todo, onCheckBtnClick }) {
    return (
        <div className="wrapper">
            <ButtonStyled 
                sx={{ width: 400, fontSize: 16, fontWeight: 700, }}
                isCompleted={todo.isCompleted}
                >
                <div className="name">{todo.name}</div>
            </ButtonStyled>
                
                
            
            <CheckCircleIcon className={!todo.isCompleted ? "icon" : "iconNone"} onClick={() => onCheckBtnClick(todo.id)}/>
        </div>
        
    );
}

export default Todo;