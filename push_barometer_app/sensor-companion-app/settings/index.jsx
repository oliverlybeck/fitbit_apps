function testSettings() {
  return (
  <Page>
    <Section
      title={
        <Text bold align="center">
          App Settings
        </Text>
      }
    >
      <Text>Choose which sensor you wish</Text>    
      <Toggle
          settingsKey="hr"
          label="Heart Rate Monitor"
        />
      <Toggle
          settingsKey="bar"
          label="Barometer Monitor"
        />
    </Section>
  </Page>
  );
}

registerSettingsPage(testSettings);
