import { StyleSheet } from 'react-native';

const appStyles = StyleSheet.create({
  rows: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: '3%',
    borderBottomWidth: 1,
    borderBottomColor: "gray"
  },
  columns: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    height: 60,
    textAlign: "center",
    textAlignVertical: "center",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
});

export default appStyles;
