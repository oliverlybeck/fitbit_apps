registerSettingsPage(({ settings }) => (
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
      <Text>General</Text>  
      <Toggle
          settingsKey="resetTumbler"
          label="Reset Tumbler on Submit"
        />
    </Section>
  </Page>
));
