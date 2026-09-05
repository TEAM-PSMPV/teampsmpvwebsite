import type { Metadata } from "next";
import { BulletList, NumberedList, VisynContactBlock, VisynLegalActions, VisynLegalHero, visynDetails } from "../content";

export const metadata: Metadata = {
  title: "Visyn Data Deletion",
  description: "How to request deletion of personal information processed through Visyn.",
  alternates: { canonical: "/products/visyn/data-deletion" },
};

export default function VisynDataDeletionPage() {
  return (
    <main id="main-content">
      <VisynLegalHero label="VISYN / DATA DELETION" title="VISYN DATA DELETION" lead={`Last updated: ${visynDetails.updated}. Request deletion of personal information processed through Visyn.`} />
      <article className="content legal-document">
        <p><strong>Last updated: {visynDetails.updated}</strong></p>
        <p>You may request deletion of personal information processed through Visyn.</p>
        <section><h2>Request deletion by email</h2><p>Send a request to: <a href={`mailto:${visynDetails.email}?subject=Visyn%20Data%20Deletion%20Request`}>{visynDetails.email}</a></p><p>Use the subject:</p><p><strong>Visyn Data Deletion Request</strong></p><p>Include:</p><BulletList items={["Your name.", "Business or workspace name.", "Email address associated with the account.", "Phone number, if relevant.", "Whether you are requesting deletion of your account, workspace, contact record, messages, or all information.", "Any Meta or WhatsApp account identifier you want us to review."]} /><p>Do not send passwords, access tokens, OTPs, or unnecessary customer message content.</p></section>
        <section><h2>What happens after a request</h2><p>We will:</p><NumberedList items={["Verify the identity and authority of the requester.", "Identify the relevant account, workspace, and data.", "Confirm the scope of the request.", "Delete or anonymize information that we are not required to retain.", "Disconnect or assist with disconnecting third-party integrations where applicable.", "Notify you when the request is completed or explain why some information must be retained."]} /></section>
        <section><h2>Deletion timing</h2><p>We aim to acknowledge requests within 30 days and complete eligible deletion within 90 days, subject to applicable law, technical limitations, backups, disputes, fraud prevention, security records, billing obligations, and legal retention requirements.</p><p>Information in backups may remain until the backup naturally expires or is securely overwritten. Backup data will not be restored for ordinary use except when necessary for disaster recovery.</p></section>
        <section><h2>WhatsApp and Meta data</h2><p>Deleting information from Visyn does not necessarily delete information held by Meta, WhatsApp, the connected Business Portfolio, the WhatsApp Business Account, or a customer’s own systems.</p><p>For deletion from Meta or WhatsApp, use the relevant Meta/WhatsApp controls or contact Meta support.</p></section>
        <section><h2>Disconnecting Visyn</h2><p>A business administrator may request disconnection of Visyn from a WhatsApp Business Account by contacting <a href={`mailto:${visynDetails.email}`}>{visynDetails.email}</a>.</p><p>After disconnection, Visyn will stop using the integration, subject to processing required for security, legal obligations, billing, dispute resolution, and completion of queued operations.</p></section>
        <section><h2>Contact</h2><VisynContactBlock privacy /></section>
        <VisynLegalActions />
      </article>
    </main>
  );
}
