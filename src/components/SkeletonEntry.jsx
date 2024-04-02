import { ListItem, Typography } from "@material-tailwind/react";
export function SkeletonEntry() {
  return (
    <div className="max-w-full animate-pulse">
      <ListItem ripple={false} className="py-1 pr-1 pl-4 journal-entry-in-list">
        <div className="entry-info">
          <Typography
            as="div"
            variant="h1"
            className="mb-4 h-3 w-56 rounded-full bg-gray-300"
          >
            &nbsp;
          </Typography>
        </div>
      </ListItem>
    </div>
  );
}
