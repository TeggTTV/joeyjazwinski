import { getSynchronizedPatchNotes } from '../src/utils/patchNotesSync';

async function main() {
	console.log('🔄 Running automated patch notes sync from Git repo to MongoDB...');
	const notes = await getSynchronizedPatchNotes();
	console.log(`✅ Synchronization complete! Total patch notes in database: ${notes.length}`);
	if (notes.length > 0) {
		console.log(`🚀 Latest release: v${notes[0].version} - "${notes[0].title}" (${notes[0].date})`);
	}
}

main().catch((err) => {
	console.error('❌ Error syncing patch notes:', err);
	process.exit(1);
});
