import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const CourseLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default CourseLayout;
