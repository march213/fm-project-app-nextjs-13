import { Suspense } from 'react';
import { TaskCard } from '@/components/TaskCard';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { getUserFromCookie } from '@/lib/auth';

const getData = async (id: string) => {
  const user = await getUserFromCookie(cookies());
  const project = await db.project.findFirst({
    where: { id, ownerId: user?.id },
    include: {
      tasks: true,
    },
  });

  return project;
};

const ProjectPage = async ({ params }: { params: any }) => {
  const project = await getData(params.id);

  if (!project) return null;

  return (
    <div className="h-full overflow-y-auto pr-6 w-1/1">
      <Suspense>
        {/* @ts-ignore */}
        <TaskCard tasks={project.tasks} title={project.name} />
      </Suspense>
    </div>
  );
};

export default ProjectPage;
