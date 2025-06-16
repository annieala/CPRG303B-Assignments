// File: app/(tabs)/index.tsx

import { StyleSheet, Image, View } from 'react-native';
import CityLink from '../../components/CityLink';
import CityInfo from '../../components/CityInfo'; // Adjust path if needed

export default function CalgaryScreen() {
  const calgaryInfo = "Calgary, a cosmopolitan Alberta city with numerous skyscrapers, owes its rapid growth to its status as the centre of Canada’s oil industry. However, it’s still steeped in the western culture that earned it the nickname “Cowtown,” evident in the Calgary Stampede.";

  return (
    <View style={styles.container}>
      {/* You need to add a Calgary image to your assets folder */}
      <Image 
        source={require('../../assets/calgary.jpg')} // CHANGE THIS to your image path
        style={styles.cityImage} 
      />
      <CityLink url="https://www.calgary.ca/home.html" />
      <CityInfo info={calgaryInfo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  cityImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
});