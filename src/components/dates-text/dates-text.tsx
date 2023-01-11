import React from 'react';
import {Text} from '@mantine/core';
import {format} from 'date-fns';

interface DatesTextProps {
  date: string
}

const DatesText = ({date}: DatesTextProps): JSX.Element => {
  return (
    <Text size="sm">{format(new Date(date), 'MMM d, yyyy')}</Text>
  );
};

export default DatesText;
