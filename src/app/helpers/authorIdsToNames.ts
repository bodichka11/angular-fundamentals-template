import { Course } from '@app/models/course.models';
import { Author } from '@app/models/author';

export const authorIdsToNames = (
  course: Course,
  authors: Author[]
): Course => ({
  ...course,
  authors: authors
    .filter(({ id }) => course.authors.includes(id))
    .map(({ name }) => name),
});