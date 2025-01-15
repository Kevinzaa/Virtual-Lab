import { View, Text, StyleSheet } from "react-native";

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={[styles.title, titleStyles]}>
        {title}
      </Text>
      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontFamily : "Poppins-Bold",
},
subtitle: {
    fontSize: 14,
    color: '#ddd',
    textAlign: 'center',
    fontFamily : "Poppins-SemiBold",
  },
});

export default InfoBox;