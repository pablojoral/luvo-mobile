import { Label } from 'components/Label/Label';
import { StyleProp, ViewStyle } from 'react-native';

interface LocationLabelProps {
  location: string;
  numberOfLines?: number;
  style?: StyleProp<ViewStyle>;
}

export const LocationLabel = ({ location, numberOfLines = 1, style }: LocationLabelProps) => {
  return (
    <Label
      iconName="MapPin"
      iconSize="icon-size-sm"
      color="font-placeholder"
      fontSize="font-size-sm"
      numberOfLines={numberOfLines}
      style={style}
    >
      {location}
    </Label>
  );
};
