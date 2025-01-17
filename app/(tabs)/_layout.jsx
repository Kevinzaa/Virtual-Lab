import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { icons } from '../../constants';
import theme from '../../style';

const TabsLayout = () => {
  const { width: screenWidth } = useWindowDimensions();
  const isWeb = screenWidth >= 768;

  const TabIcon = ({ icon, color, name, focused }) => {
    return (
      <View style={styles.iconContainer}>
        <Image
          style={[styles.icon, { tintColor: color }]}
          source={icon}
          resizeMode="contain"
        />
        <Text style={[styles.text, focused ? styles.textFocused : styles.textRegular]}>
          {name}
        </Text>
      </View>
    );
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: [styles.tabBar, isWeb && styles.webTabBar],
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.tabbaroff,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.home} color={color} focused={focused} name="Home" />
            ),
          }}
        />
        <Tabs.Screen
          name="video"
          options={{
            title: 'video',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.video} color={color} focused={focused} name="Videos" />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.plus} color={color} focused={focused} name="Create" />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.profile} color={color} focused={focused} name="Profile" />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 65, 
    paddingTop: 5, 
    paddingBottom: 5, 
    backgroundColor: theme.colors.secondary.DEFAULT, 
    borderTopWidth: 0,
    borderTopColor: '#232533',
  },
  webTabBar: {
    // Adjustments for web view
    height: 80, // Increase height for better touch area on web
    paddingHorizontal: 40, // Add padding for larger screens
  },
  iconContainer: {
    alignItems: 'center', 
    justifyContent: 'center',
    width: 70,
    marginTop: 10,
  },
  icon: {
    width: 24, 
    height: 24,
    marginTop: 15,
  },
  text: {
    fontSize: 10, 
    marginTop: 3, 
    textAlign: 'center',
  },
  textFocused: {
    fontFamily: 'Poppins-SemiBold',
    color: theme.colors.primary, 
  },
  textRegular: {
    fontFamily: 'Poppins-Light',
    color: '#a9a9a9', 
  },
});

export default TabsLayout;