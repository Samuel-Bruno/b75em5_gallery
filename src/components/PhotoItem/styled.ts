import styled from 'styled-components'

export const Container = styled.div`
  position:relative;
  background-color:#3D3F43;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  padding:10px;
  border-radius:5px;
  overflow:hidden;

  img {
    width:100%;
    height:auto;
    margin-bottom:10px;
  }
`

export const DeleteArea = styled.div`
  position:absolute;
  background-color:rgba(0,0,0,0.6);
  height:100%;
  top:-50%;
  opacity:0;
  right:0; left:0;
  display:flex;
  justify-content:center;
  align-items:center;

  transition: top .4s, opacity .4s;
  cursor:pointer;

  span {
    font-size:20px;
    font-weight:bold;
  }

  div:hover > & {
    top:0;
    opacity:1;
  }
`