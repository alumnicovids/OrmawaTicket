import { StyleSheet, Text as RNText } from 'react-native';
import { fonts } from '../theme';

// Text bawaan RN memakai font sistem; komponen ini memakai Plus Jakarta Sans. `style` menimpa (mis. bobot lain).
export function Text({ style, ...props }) {
  return <RNText style={[styles.base, style]} {...props} />;
}

const styles = StyleSheet.create({ base: { fontFamily: fonts.regular } });
