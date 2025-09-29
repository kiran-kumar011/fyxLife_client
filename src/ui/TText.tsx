import {
  Text,
  TextProps,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import { color, typography, spacing } from '../constants/design';

type Variant = 'title' | 'subTitle' | 'body' | 'caption';

export interface TTextProps extends TextProps {
  variant?: Variant;
  style?: StyleProp<TextStyle>;
}

const mapVariant: Record<Variant, TextStyle> = {
  title: {
    fontSize: typography.title,
    fontWeight: '700',
    lineHeight: spacing.xl,
  },
  subTitle: { fontSize: typography.subTitle, fontWeight: '500' },
  body: { fontSize: typography.body, lineHeight: typography.line },
  caption: { fontSize: typography.caption, color: color.subtleText },
};

export default function TText({
  variant = 'body',
  style,
  ...rest
}: TTextProps) {
  return <Text style={[styles.base, mapVariant[variant], style]} {...rest} />;
}

const styles = StyleSheet.create({
  base: { color: color.text, fontFamily: 'System' },
});
