import { Colors } from './colors';
import styled from 'styled-components';

export const CommonButton = styled.div`
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  margin: 5px 0;
  border: 1px solid ${Colors.GreyLightIIII};
  border-radius: 5px;
  cursor: pointer;
`;

export const CommonInput = styled.input`
  padding: 0px;
  inline-size: 100%;
  text-indent: 10px;
  font-size: 16px;
  line-height: 30px;
  outline: none;
  border-radius: 10px;
  border: 1px ${Colors.GreyLightIIII} solid;
`;

// File Upload Input Box
export const CommonFileUploader = styled.div`
  width: 160px;
  color: transparent;
  &::-webkit-file-upload-button {
    visibility: hidden;
  }
  &::before {
    display: block;
    color: ${Colors.Black};
    content: 'Upload Your Porlifio';
    text-align: center;
    line-height: 150px;
    width: 150px;
    height: 150px;
    border: 4px dashed ${Colors.Black};
  }
  &::after {
    margin-top: -10px;
    display: block;
    content: 'Upload Your Porlifio';
    width: 150px;
    height: 30px;
    color: ${Colors.Black};
    line-height: 30px;
    text-align: center;
    border: 4px solid ${Colors.Black};
    border-radius: 10px;
  }
`;

// Forbid user interaction
export const ForbidSelect = styled.div`
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Likely future */
  outline: none;
`;

/* .MyWacai-File-Uploader::-webkit-file-upload-button {
  visibility: hidden;
}

.MyWacai-File-Uploader::before {
  display: block;
  color: $BLACK;
  content: 'Upload Your Porlifio';
  text-align: center;
  line-height: 150px;
  width: 150px;
  height: 150px;
  border: 4px dashed $BLACK;
}

.MyWacai-File-Uploader::after {
  margin-top: -10px;
  display: block;
  content: 'Upload Your Porlifio';
  width: 150px;
  height: 30px;
  color: $BLACK;
  line-height: 30px;
  text-align: center;
  border: 4px solid $BLACK;
  border-radius: 10px;
}

@mixin File--Uploaded() {
  width: 160px;
  height: 204px;
  background-color: $GREY-LIGHT-IIII;
  color: $BLACK;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
} */
