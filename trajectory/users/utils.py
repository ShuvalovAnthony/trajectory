from main.models import Step, StepStatus


def create_statuses_for_steps(user):
    for step in Step.objects.all():
        stepstatus = StepStatus.objects.create(step=step, user=user)
        stepstatus.save()