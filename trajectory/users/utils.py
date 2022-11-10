from main.models import Step, StepStatus


def create_statuses_for_steps(user): # переделать создание при зачислении на курс
    for step in Step.objects.all():
        stepstatus = StepStatus.objects.create(step=step, user=user)
        stepstatus.save()