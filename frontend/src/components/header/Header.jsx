import React from 'react';
import { ActionIcon } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';

const Header = () => {
  return (
    <div className='bg-primary-200 w-full h-16 '>
      <ActionIcon variant="transparent" size="lg" aria-label="Settings">
        <IconAdjustments style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </div>
  );
};

export default Header;