import {Context} from '@actions/github/lib/context';

export const getAssignees = (context: Context): string[] | false => {
    const sender = getSender(context);
    if (false === sender) return false;

    const assignees = getCurrentAssignees(context);
    if (false === assignees) return false;

    if (assignees.includes(sender)) return [];

    return [sender];
};

const getSender = (context: Context): string | false => context.payload.sender && context.payload.sender.type === 'User' ? context.payload.sender.login : false;

const getCurrentAssignees = (context: Context): string[] | false => {
    if ('issues' === context.eventName) {
        return context.payload.issue && 'assignees' in context.payload.issue ? context.payload.issue.assignees.map(assignee => assignee.login) : false;
    }
    if ('pull_request' === context.eventName) {
        return context.payload.pull_request && 'assignees' in context.payload.pull_request ? context.payload.pull_request.assignees.map(assignee => assignee.login) : false;
    }
    return false;
};
