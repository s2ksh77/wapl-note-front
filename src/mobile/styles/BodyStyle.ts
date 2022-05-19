import { styled, Chip } from '@wapl/ui';


export const CategoryIndex = styled.p`  
  color: #9E9E9E;
  font-weight: 500;
  font-size: 13px;
  margin-left: 16px;
`;

export const STagChipContainer = styled.div`  
  display: flex;
  height: 43px;
  align-items: center;
  padding: 0 16px;
`;

export const SChip = styled(Chip)`
    :not(:last-child) {
        margin-right:5px;
    }    
`;

