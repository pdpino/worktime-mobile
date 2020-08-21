import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 5,
  },
  label: {
    fontSize: 15,
    color: 'black',
    fontStyle: 'italic',
    marginBottom: 2,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'white',
    textAlignVertical: 'top',
    padding: 10,
  },
});

export default commonStyles;
