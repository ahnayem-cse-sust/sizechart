import { authenticate } from "../shopify.server";
import db from "../db.server";

export const action = async ({ request }) => {
  const { shop, session, topic } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);

  // Webhook requests can trigger multiple times and after an app has already been uninstalled.
  // If this webhook already ran, the session may have been deleted previously.
  if (session) {
    await db.session.deleteMany({ where: { shop } });
    // Also drop the shop's app settings so a reinstall starts clean rather
    // than silently inheriting a stale configuration from before.
    await db.setting.deleteMany({ where: { shop } });
  }

  return new Response();
};
