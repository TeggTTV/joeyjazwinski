import { PrismaClient } from '../src/generated/prisma/client';
import { PATCH_NOTES } from '../src/data/patchNotes';

const prisma = new PrismaClient();

async function main() {
	console.log('Seeding patch notes into MongoDB...');
	let seeded = 0;
	let skipped = 0;

	for (const note of PATCH_NOTES) {
		try {
			const existing = await prisma.patchNote.findUnique({
				where: { version: note.version },
			});

			if (!existing) {
				await prisma.patchNote.create({
					data: {
						version: note.version,
						title: note.title,
						date: note.date,
						type: note.type,
						changes: note.changes,
					},
				});
				seeded++;
			} else {
				skipped++;
			}
		} catch (err) {
			console.error(`Error processing version ${note.version}:`, err);
		}
	}

	console.log(`Finished! Seeded ${seeded} patch notes. Skipped ${skipped} already existing.`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
