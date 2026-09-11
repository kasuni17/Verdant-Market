import { StaticPage } from "../components/StaticPage";

export function Privacy() {
  return (
    <StaticPage eyebrow="Legal" title="Privacy Notice">
      <p>This is a demo storefront. No real personal data, payment details or order information are collected or transmitted to any server: data shown is stored only in your browser's local storage for demonstration purposes.</p>
      <p>In a production environment, this section would describe what data is collected, how it is used, and the choices available to you regarding your information.</p>
    </StaticPage>
  );
}
